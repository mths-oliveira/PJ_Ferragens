export function List(list: string[]) {
  return `<ul style=" list-style: none; font-size: 16px; padding: 0">
            ${list.map((content, i) => {
              const marginTop = i === 0 ? 0 : 16;
              return `<li style="display: flex; margin-top: ${marginTop}px;">${content}</li>`;
            })}
          </ul>`.replace(/>,/g, '>');
}

export function Table([headers, ...records]: string[][]) {
  return `<table style=" width: fit-content; text-align: center; margin-top: 8px; background-color: rgba(0, 0, 0, 0.1); border-radius: 5px;">
            <caption style=" margin-bottom: 16px; font-size: 16px; white-space: nowrap; text-align: left; font-weight: bold;">Lista para orçamento:</caption>
            <tr style="background-color: #00aaaa; color: #ffffff; font-size: 16px">
              ${headers.map(
                (title) => `<th style="padding: 12px 16px">${title}</th>`
              )}      
            </tr>
            ${records.map(
              (record) => `
              <tr style="background-color: #ffffff">
               ${record.map(
                 (content) => `<td style="padding: 8px 16px">${content}</td>`
               )}
              </tr>`
            )}
          </table>`.replace(/>,/g, '>');
}
