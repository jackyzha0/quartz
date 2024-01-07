document.addEventListener("nav", () => {
  document.querySelectorAll(".task-list-item").forEach(addToggleHandler)
})

function addToggleHandler(listItem: Element, index: number) {
  const toggleCheckbox = (e: any) => {
    const updatedCheckboxState: boolean = e.target.checked
    const checkboxId = createCheckboxId(index)
    localStorage.setItem(checkboxId, JSON.stringify(updatedCheckboxState))
  }

  const checkbox = extractCheckbox(listItem)
  if (!checkbox) return
  handleCheckboxState(checkbox, index)
  checkbox.addEventListener("change", toggleCheckbox)
}

function handleCheckboxState(checkbox: HTMLInputElement, index: number) {
  const checkboxId = createCheckboxId(index)
  const savedCheckboxState = localStorage.getItem(checkboxId)
  if (savedCheckboxState) checkbox.checked = JSON.parse(savedCheckboxState)
  else localStorage.setItem(checkboxId, JSON.stringify(checkbox.checked))
}

function extractCheckbox(listItem: Element) {
  return listItem.querySelector('input[type="checkbox"]') as HTMLInputElement
}

function createCheckboxId(index: number) {
  const title: string = document.title
  return `is-${title}-checkbox-${index}-enabled`
}
