export const formattedDate = (date: number) => {
    const d = new Date(date);
    return ` ${d.getDate()}.${d.getMonth()}.${d.getFullYear()}  ${d.getHours()}:${d.getMinutes()} `;
}