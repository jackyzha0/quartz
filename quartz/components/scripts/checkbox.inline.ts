document.addEventListener("nav", () => {
  document.querySelectorAll('.task-list-item').forEach((addToggleHandler));
})

function addToggleHandler (listItem: Element, index: number ) {

  const toggleCheckbox = (e:any) => {
    const updatedCheckboxState: boolean = e.target.checked;
    localStorage.setItem(`isCheckbox-${index}-enabled`, JSON.stringify(updatedCheckboxState));
  }

  const checkbox = extractCheckbox(listItem);
  if(!checkbox) return
  handleCheckboxState(checkbox,index)
  checkbox.addEventListener("change", toggleCheckbox)
}

function handleCheckboxState(checkbox: HTMLInputElement, index: number ) {
  const savedCheckboxState = localStorage.getItem(`isCheckbox-${index}-enabled`);
  if(savedCheckboxState) 
      checkbox.checked = JSON.parse(savedCheckboxState);
  else
    localStorage.setItem(`isCheckbox-${index}-enabled`, JSON.stringify(checkbox.checked))
}


function extractCheckbox(listItem: Element) {
  return listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
}
