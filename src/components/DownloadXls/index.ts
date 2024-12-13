import * as XLSX from 'xlsx';

export const downloadExcel = (order: any) => {
  try {
    // Crear los datos para la hoja de cálculo
    const data = [
      { Campo: "Orden ID", Valor: order.id },
      { Campo: "Usuario ID", Valor: order.userId },
      { Campo: "Modelo", Valor: order.model },
      { Campo: "Kilataje", Valor: order.caratage },
      { Campo: "Color", Valor: order.color },
      { Campo: "Piedra", Valor: order.rock },
      { Campo: "Estado", Valor: order.status },
      { Campo: "Piezas Totales", Valor: order.totalPieces },
      { Campo: "Observaciones", Valor: order.observations || "Ninguna" },
      { Campo: "Creado el", Valor: new Date(order.createdAt).toLocaleString() },
    ];

    // Agregar arrays al archivo
    if (order.initialName?.length) {
      data.push({ Campo: "Iniciales", Valor: "" });
      order.initialName.forEach((item: any) => {
        data.push({ Campo: `  - ${item.name}`, Valor: item.count });
      });
    }

    if (order.size?.length) {
      data.push({ Campo: "Tallas", Valor: "" });
      order.size.forEach((item: any) => {
        data.push({ Campo: `  - ${item.name}`, Valor: item.count });
      });
    }

    if (order.long?.length) {
      data.push({ Campo: "Largos", Valor: "" });
      order.long.forEach((item: any) => {
        data.push({ Campo: `  - ${item.name}`, Valor: item.count });
      });
    }

    if (order.name?.length) {
      data.push({ Campo: "Nombres", Valor: "" });
      order.name.forEach((item: any) => {
        data.push({ Campo: `  - ${item.value}`, Valor: item.count });
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
