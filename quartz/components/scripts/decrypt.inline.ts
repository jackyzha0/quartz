import { base64 } from "rfc4648"

// @ts-ignore:next-line
function find<T>(selector: string): T {
  const element = document.querySelector(selector) as T
  if (element) return element
}

let salt: Uint8Array, iv: Uint8Array, ciphertext: Uint8Array, iterations: number
const subtle =
  window.crypto?.subtle ||
  (window.crypto as unknown as { webkitSubtle: Crypto["subtle"] })?.webkitSubtle

let pl: HTMLPreElement,
  form: HTMLFormElement,
  pwd: HTMLInputElement,
  load: HTMLDivElement,
  loadText: HTMLElement,
  lock: HTMLDivElement,
  msg: HTMLParagraphElement,
  article: HTMLElement

async function decryptHTML() {
  pl = find<HTMLPreElement>("pre[data-i]")
  form = find<HTMLFormElement>("form")
  pwd = find<HTMLInputElement>(".pwd")
  load = find<HTMLDivElement>("#load")
  loadText = find<HTMLElement>("#load-text")
  lock = find<HTMLDivElement>("#lock")
  msg = find<HTMLParagraphElement>("#msg")
  article = find<HTMLElement>("#content")

  if (!pl || !form || !pwd) {
    return
  }
  pwd.value = ""
  if (!subtle) {
    pwd.disabled = true
    error("modern")
    return
  }

  show(lock)
  if (!pl.innerHTML) {
    pwd.disabled = true
    error("empty")
    return
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    await decrypt()
  })

  iterations = Number(pl.dataset.i)
  const bytes = base64.parse(pl.innerHTML)
  salt = bytes.slice(0, 32)
  iv = bytes.slice(32, 32 + 16)
  ciphertext = bytes.slice(32 + 16)

  if (location.hash) {
    const parts = location.href.split("#")
    pwd.value = parts[1]
    history.replaceState(null, "", parts[0])
  }

  if (sessionStorage[document.body.dataset.slug!] || pwd.value) {
    await decrypt()
  } else {
    hide(load)
    show(form)
    pwd.focus()
  }
}

document.addEventListener("nav", decryptHTML)

function show(element: Element) {
  element.classList.remove("hidden")
}

function hide(element: Element) {
  element.classList.add("hidden")
}

function error(code: string) {
  msg.innerText = msg.getAttribute("data-" + code) || ""
}

async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function decrypt() {
  loadText.innerText = loadText.getAttribute("data-decrypt") || ""
  show(load)
  hide(form)
  await sleep(60)

  try {
    const decrypted = await decryptFile({ salt, iv, ciphertext, iterations }, pwd.value)

    article.innerHTML = decrypted
    hide(lock)
  } catch (e) {
    hide(load)
    show(form)

    if (sessionStorage[document.body.dataset.slug!]) {
      sessionStorage.removeItem(document.body.dataset.slug!)
    } else {
      error("wrong")
    }

    pwd.value = ""
    pwd.focus()
  }
}

async function deriveKey(
  salt: Uint8Array,
  password: string,
  iterations: number,
): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const baseKey = await subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveKey",
  ])
  return await subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"],
  )
}

async function importKey(key: JsonWebKey) {
  return subtle.importKey("jwk", key, "AES-GCM", true, ["decrypt"])
}

async function decryptFile(
  {
    salt,
    iv,
    ciphertext,
    iterations,
  }: {
    salt: Uint8Array
    iv: Uint8Array
    ciphertext: Uint8Array
    iterations: number
  },
  password: string,
) {
  const decoder = new TextDecoder()

  const key = sessionStorage[document.body.dataset.slug!]
    ? await importKey(JSON.parse(sessionStorage[document.body.dataset.slug!]))
    : await deriveKey(salt, password, iterations)

  const data = new Uint8Array(await subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext))
  if (!data) throw "Malformed data"

  sessionStorage[document.body.dataset.slug!] = JSON.stringify(await subtle.exportKey("jwk", key))

  return decoder.decode(data)
}
