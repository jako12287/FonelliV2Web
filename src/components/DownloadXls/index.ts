import * as XLSX from "xlsx";

export const downloadExcel = (order: any) => {
  try {
    // Crear un arreglo para almacenar los datos
    const data: { Campo: string; Valor: any }[] = [];

    // Título del archivo
    data.push({ Campo: "Título", Valor: "Orden de pedido Fonelli" });
    data.push({ Campo: "", Valor: "" });

    // Información General
    data.push({ Campo: "Información General", Valor: "" });
    if (order.id) data.push({ Campo: "Orden ID", Valor: order.id });
    if (order.customerNumber || order?.email)
      data.push({
        Campo: "Usuario ID",
        Valor: `${order.customerNumber || ""} ${
          order.email ? "/ " + order.email : ""
        }`,
      });
    if (order.model) data.push({ Campo: "Modelo", Valor: order.model });
    if (order.caratage) data.push({ Campo: "Kilataje", Valor: order.caratage });
    if (order.color) data.push({ Campo: "Color", Valor: order.color });
    if (order.rock) data.push({ Campo: "Piedra", Valor: order.rock });
    if (order.status)
      data.push({
        Campo: "Estado",
        Valor: order.status === "PENDING" ? "SOLICITADO" : "CAPTURADO",
      });
    if (order.totalPieces)
      data.push({ Campo: "Piezas Totales", Valor: order.totalPieces });
    if (order.observations)
      data.push({ Campo: "Observaciones", Valor: order.observations });
    if (order.createdAt)
      data.push({
        Campo: "Creado el",
        Valor: new Date(order.createdAt).toLocaleString(),
      });

    data.push({ Campo: "", Valor: "" });

    // Iniciales
    if (order.initialName?.length) {
      const totalCount = order.initialName.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );

      if (totalCount > 0) {
        data.push({ Campo: "Iniciales", Valor: "" });
        order.initialName.forEach((item: any) => {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        });
        data.push({ Campo: "", Valor: "" });
      }
    }

    // Tallas
    if (order.size?.length) {
      const totalCount = order.size.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );

      if (totalCount > 0) {
        data.push({ Campo: "Tallas", Valor: "" });
        order.size.forEach((item: any) => {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        });
        data.push({ Campo: "", Valor: "" });
      }
    }

    // Largos
    if (order.long?.length) {
      const totalCount = order.long.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );

      if (totalCount > 0) {
        data.push({ Campo: "Largos", Valor: "" });
        order.long.forEach((item: any) => {
          data.push({ Campo: `  - ${item.name}`, Valor: item.count });
        });
        data.push({ Campo: "", Valor: "" });
      }
    }

    // Nombres
    if (order.name?.length) {
      const totalCount = order.name.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );

      if (totalCount > 0) {
        data.push({ Campo: "Nombres", Valor: "" });
        order.name.forEach((item: any) => {
          data.push({ Campo: `  - ${item.value}`, Valor: item.count });
        });
        data.push({ Campo: "", Valor: "" });
      }
    }

    // Crear la hoja de trabajo y el libro
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orden");

    // Generar y descargar el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Orden_${order.id || "desconocida"}.xlsx`;
    link.click();
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
  }
};
