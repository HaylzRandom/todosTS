import FullList from '../model/FullList';

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  // Singleton
  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = '';
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      // Create list item element
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      // Input
      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.checked = item.checked;
      check.ariaLabel = `Mark ${item.item} as completed`;

      // Add to list item
      li.append(check);

      // Event listener for checked box
      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // Label
      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;

      // Add to list item
      li.append(label);

      // Delete button
      const deleteBtn = document.createElement('button') as HTMLButtonElement;
      deleteBtn.className = 'button';
      deleteBtn.type = 'button';
      deleteBtn.ariaLabel = 'Delete';
      deleteBtn.innerText = 'X';

      // Add to list item
      li.append(deleteBtn);

      deleteBtn.addEventListener('click', () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      // Add list item to list
      this.ul.append(li);
    });
  }
}
