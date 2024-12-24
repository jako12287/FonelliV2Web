import * as XLSX from 'xlsx';

export const downloadExcel = (order: any) => {
  try {
    // Crear los datos para la hoja de cálculo
    const data: { Campo: string; Valor: any }[] = [];

    if (order.id) data.push({ Campo: "Orden ID", Valor: order.id });
    if (order.userId) data.push({ Campo: "Usuario ID", Valor: order.userId });
    if (order.model) data.push({ Campo: "Modelo", Valor: order.model });
    if (order.caratage) data.push({ Campo: "Kilataje", Valor: order.caratage });
    if (order.color) data.push({ Campo: "Color", Valor: order.color });
    if (order.rock) data.push({ Campo: "Piedra", Valor: order.rock });
    if (order.status) data.push({ Campo: "Estado", Valor: order.status });
    if (order.totalPieces) data.push({ Campo: "Piezas Totales", Valor: order.totalPieces });
    if (order.observations) data.push({ Campo: "Observaciones", Valor: order.observations });
    if (order.createdAt) data.push({ Campo: "Creado el", Valor: new Date(order.createdAt).toLocaleString() });

    // Iniciales
    if (order.initialName?.length) {
      data.push({ Campo: "Iniciales", Valor: "" });
      order.initialName.forEach((item: any) => {
        if (item.name && item.count) {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        }
      });
    }

    // Tallas
    if (order.size?.length) {
      data.push({ Campo: "Tallas", Valor: "" });
      order.size.forEach((item: any) => {
        if (item.name && item.count) {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        }
      });
    }

    // Largos
    if (order.long?.length) {
      data.push({ Campo: "Largos", Valor: "" });
      order.long.forEach((item: any) => {
        if (item.name && item.count) {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        }
      });
    }

    // Nombres
    if (order.name?.length) {
      data.push({ Campo: "Nombres", Valor: "" });
      order.name.forEach((item: any) => {
        if (item.value && item.count) {
          data.push({ Campo: `  - ${item.value}`, Valor: item.count });
        }
      });
    }

    // Crear una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orden");

    // Generar el archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Crear un Blob y descargarlo
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Orden_${order.id}.xlsx`;
    link.click();

  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
  }
};
