import { Technology } from '../../types/helperTypes';

export function listTechnologies(technologies: Technology[]) {
  // const list = professors.map((p) => `${p.name} - sala ${p.room}`);
  // return `<ul> ${list.join('')}</ul>`;

  const list = technologies.map((t) =>
    t.poweredByNodejs === true ? `<li>${t.name} - ${t.type}</li>` : null
  );

  return `<ul> ${list.join('')}</ul>`;
}

export function showArrowIcon(url: string) {
  return `
  <h3>
    <a href='${url}' class='icons'>
      <i class='bi bi-arrow-left-square'></i>
    </a>
  </h3>`;
}

export function showAddIcon(url: string) {
  return `
   <h3>
      <a href='${url}' class='icons'>
        <i class='bi bi-plus-circle'></i>
      </a>
    </h3>
  `;
}

export function isEqual(a: any, b: any) {
  return a === b;
}

export function add(a: number, b: number) {
  return a + b;
}
