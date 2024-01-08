import { getFullSlug } from "../../util/path"

document.addEventListener("nav", () => {
  document.querySelectorAll('.contains-task-list input[type="checkbox"]').forEach(addToggleHandler)
})

function addToggleHandler(checkbox: Element, index: number) {
  const toggleCheckbox = (e: any) => {
    const updatedCheckboxState: boolean = e.target.checked
    const checkboxId = checkbox.getAttribute("data-checkbox-id")
    if (checkboxId) localStorage.setItem(checkboxId, JSON.stringify(updatedCheckboxState))
  }

  if (!checkbox) return
  handleCheckboxState(checkbox as HTMLInputElement, index)
  checkbox.addEventListener("change", toggleCheckbox)
}

function handleCheckboxState(checkbox: HTMLInputElement, index: number) {
  const checkboxId = createCheckboxId(index)
  checkbox.setAttribute("data-checkbox-id", checkboxId)

  const savedCheckboxState = localStorage.getItem(checkboxId)
  if (savedCheckboxState) checkbox.checked = JSON.parse(savedCheckboxState)
  else localStorage.setItem(checkboxId, JSON.stringify(checkbox.checked))
}

function createCheckboxId(index: number) {
  const dataSlug = getFullSlug(window)
  return `${dataSlug}-checkbox-${index}`
}
