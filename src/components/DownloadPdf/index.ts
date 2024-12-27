import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { stateType } from "../../types";

export const downloadPDF = async (order: any) => {
  try {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Agregar una página al documento
    const page = pdfDoc.addPage([600, 800]);

    const poppinsFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Definir colores y tamaños
    const titleFontSize = 24;
    const headerFontSize = 14;
    const normalFontSize = 12;

    // Agregar título
    const title = "Orden de pedido Fonelli";
    const titleWidth = page.getWidth() / 2 - (title.length * titleFontSize) / 4;
    page.drawText(title, {
      x: titleWidth,
      y: 750,
      size: titleFontSize,
      font: poppinsFont,
      color: rgb(0.2, 0.2, 0.7),
    });

    let y = 720; // Posición inicial debajo del título

    const addSectionHeader = (text: string) => {
      page.drawText(text, {
        x: 50,
        y,
        size: headerFontSize,
        font: poppinsFont,

        color: rgb(0.1, 0.4, 0.6),
      });
      y -= 20;
    };

    const addNormalText = (text: string) => {
      page.drawText(text, {
        x: 70,
        y,
        size: normalFontSize,
        color: rgb(0, 0, 0),
      });
      y -= 16;
    };

    // Información General
    addSectionHeader("Información General:");
    if (order.customerNumber)
      addNormalText(
        `Usuario ID: ${order.customerNumber}`
      );
    if (order.model) addNormalText(`Modelo: ${order.model}`);
    if (order.caratage) addNormalText(`Kilataje: ${order.caratage}`);
    if (order.color) addNormalText(`Color: ${order.color}`);
    if (order.rock) addNormalText(`Piedra: ${order.rock}`);
    if (order.status)
      addNormalText(
        `Estado: ${
          order.status === stateType.PENDING ? "SOLICITADO" : "CAPTURADO"
        }`
      );
    if (order.totalPieces)
      addNormalText(`Piezas Totales: ${order.totalPieces}`);
    if (order.observations)
      addNormalText(`Observaciones: ${order.observations}`);
    if (order.createdAt)
      addNormalText(`Creado el: ${new Date(order.createdAt).toLocaleString()}`);

    y -= 10; // Espacio extra

    // Iniciales
    if (order.initialName?.length) {
      // Calcular la suma de todos los valores de `count`
      const totalCount = order.initialName.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );
    
      // Si la suma es mayor que 0, renderizar el contenido
      if (totalCount > 0) {
        addSectionHeader("Iniciales:");
        order.initialName
          .filter((item: any) => item.count > 0) // Filtrar los elementos con `count` > 0
          .forEach((item: any) =>
            addNormalText(`* ${item.name}: ${item.count} Piezas`)
          );
      }
    }
    

    // Tallas
    if (order.size?.length) {
      // Calcular la suma de todos los valores de `count`
      const totalCount = order.size.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );
    
      // Si la suma es mayor que 0, renderizar el contenido
      if (totalCount > 0) {
        addSectionHeader("Tallas:");
        order.size
          .filter((item: any) => item.count > 0) // Filtrar los elementos con `count` > 0
          .forEach((item: any) =>
            addNormalText(`* ${item.name}: ${item.count} Piezas`)
          );
      }
    }
    

    // Largos
    if (order?.long?.length) {
      // Calcular la suma de todos los valores de `count`
      const totalCount = order.long.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );
    
      // Si la suma es mayor que 0, renderizar el contenido
      if (totalCount > 0) {
        addSectionHeader("Largos:");
        order.long
          .filter((item: any) => item.count > 0) // Filtrar los elementos con `count` > 0
          .forEach((item: any) =>
            addNormalText(`* ${item.name}: ${item.count} Piezas`)
          );
      }
    }
    

    // Nombres
    if (order?.name?.length) {
      // Calcular la suma de todos los valores de `count`
      const totalCount = order.name.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );
    
      // Si la suma es mayor que 0, renderizar el contenido
      if (totalCount > 0) {
        addSectionHeader("Nombres:");
        order.name
          .filter((item: any) => item.count > 0) // Filtrar los elementos con `count` > 0
          .forEach((item: any) =>
            addNormalText(`* ${item.value}: ${item.count} Piezas`)
          );
      }
    }
    

    // Serializar el documento a un archivo PDF
    const pdfBytes = await pdfDoc.save();

    // Crear un blob y descargar el PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Orden_${order.id || "desconocida"}.pdf`;
    link.click();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};
