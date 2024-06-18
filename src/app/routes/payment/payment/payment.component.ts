import { Component } from '@angular/core';

@Component({
  selector: 'app-excel-export',
  template: `<button (click)="exportToExcel()">Export to Excel</button>`
})
export class PaymentComponent {
  async exportToExcel(): Promise<void> {
    // Cargar la librería exceljs de forma dinámica
    const { Workbook } = await import('exceljs');

    // Crear un nuevo libro de Excel
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Agregar datos a la hoja de cálculo
    worksheet.addRow([
      'Rut proveedor',
      'Nombre proveedor',
      'Banco Proveedor',
      'Cuenta Proveedor',
      'Tipo Documento',
      'Numero de Documento',
      'Monto',
      'Forma de pago',
      'cod suc',
      'email aviso',
      'Mensaje aviso'
    ]);

    // Establecer un estilo para los títulos de las columnas
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' } // Color amarillo
    };

    // Agregar datos
    worksheet.addRow(['187268361', 'John Doe', 'BANCO SECURITY', '447260163-0163', 'HONORARIO', 1, 10000, 'CTACTE SCOTIABANK', 2]);
    worksheet.addRow(['197778361', 'Jane Smith', 'BANCO SECURITY', '447260163-0163', 'HONORARIO', 1, 10000, 'CTACTE SCOTIABANK', 2]);
    worksheet.addRow(['140768911', 'Alice Johnson', 'BANCO SECURITY', '447260163-0163', 'HONORARIO', 1, 10000, 'CTACTE SCOTIABANK', 2]);
    // (Añade más filas según sea necesario)

    // Autoajustar el ancho de las columnas
    worksheet.columns.forEach(column => {
      let maxWidth = 0;
      if (column && column.eachCell) {
        // Llama a eachCell solo si column es definido y tiene el método eachCell
        column.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
          const len = cell.text ? cell.text.toString().length : 0;
          if (len > maxWidth) {
            maxWidth = len;
          }
        });
        column.width = maxWidth < 20 ? 20 : maxWidth;
      }
    });

    // Generar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
