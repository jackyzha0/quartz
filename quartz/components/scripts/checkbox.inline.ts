document.addEventListener("nav", () => {
  document.querySelectorAll(".task-list-item").forEach(addToggleHandler)
})

function addToggleHandler(listItem: Element) {
  const toggleCheckbox = (e: any) => {
    const updatedCheckboxState: boolean = e.target.checked
    const checkboxId = e.target.id
    localStorage.setItem(`isCheckbox-${checkboxId}-enabled`, JSON.stringify(updatedCheckboxState))
  }

  const checkbox = extractCheckbox(listItem)
  if (!checkbox) return
  handleCheckboxState(checkbox)
  checkbox.addEventListener("change", toggleCheckbox)
}

function handleCheckboxState(checkbox: HTMLInputElement) {
  const checkboxId = checkbox.id

  const savedCheckboxState = localStorage.getItem(`isCheckbox-${checkboxId}-enabled`)
  if (savedCheckboxState) checkbox.checked = JSON.parse(savedCheckboxState)
  else localStorage.setItem(`isCheckbox-${checkboxId}-enabled`, JSON.stringify(checkbox.checked))
}

function extractCheckbox(listItem: Element) {
  return listItem.querySelector('input[type="checkbox"]') as HTMLInputElement
}
