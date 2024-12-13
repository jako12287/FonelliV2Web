import { PDFDocument, rgb } from "pdf-lib";
import { stateType } from "../../types";

export const downloadPDF = async (order: any) => {
  try {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Agregar una página al documento
    const page = pdfDoc.addPage([600, 800]);

    // Definir colores y tamaños
    const titleFontSize = 24;
    const headerFontSize = 14;
    const normalFontSize = 12;

    // Agregar título
    const title = "Orden de Trabajo Fonelli";
    const titleWidth = page.getWidth() / 2 - (title.length * titleFontSize) / 4;
    page.drawText(title, {
      x: titleWidth,
      y: 750,
      size: titleFontSize,
      color: rgb(0.2, 0.2, 0.7),
    });

    let y = 720; // Posición inicial debajo del título

    const addSectionHeader = (text: string) => {
      page.drawText(text, {
        x: 50,
        y,
        size: headerFontSize,
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
    addNormalText(`Orden ID: ${order.id}`);
    addNormalText(`Usuario ID: ${order?.email || order.id}`);
    addNormalText(`Modelo: ${order.model}`);
    addNormalText(`Kilataje: ${order.caratage}`);
    addNormalText(`Color: ${order.color}`);
    addNormalText(`Piedra: ${order.rock}`);
    addNormalText(
      `Estado: ${
        order.status === stateType.PENDING ? "SOLICITADO" : "CAPTURADO"
      }`
    );
    addNormalText(`Piezas Totales: ${order.totalPieces}`);
    addNormalText(`Observaciones: ${order.observations || "Ninguna"}`);
    addNormalText(`Creado el: ${new Date(order.createdAt).toLocaleString()}`);

    y -= 10; // Espacio extra

    // Iniciales
    if (order.initialName?.length) {
      addSectionHeader("Iniciales:");
      order.initialName.forEach((item: any) =>
        addNormalText(`- ${item.name}: ${item.count}`)
      );
    }

    // Tallas
    if (order.size?.length) {
      addSectionHeader("Tallas:");
      order.size.forEach((item: any) =>
        addNormalText(`- ${item.name}: ${item.count}`)
      );
    }

    // Largos
    if (order?.long?.length) {
      addSectionHeader("Largos:");
      order.long.forEach((item: any) =>
        addNormalText(`- ${item.name}: ${item.count}`)
      );
    }

    // Nombres
    if (order?.name?.length) {
      addSectionHeader("Nombres:");
      order.name.forEach((item: any) =>
        addNormalText(`- ${item.value}: ${item.count}`)
      );
    }

    // Serializar el documento a un archivo PDF
    const pdfBytes = await pdfDoc.save();

    // Crear un blob y descargar el PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Orden_${order.id}.pdf`;
    link.click();

  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};
