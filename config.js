// Configuración de la conexión con Microsoft 365 (Torque Ingeniería).
// Ver GUIA_IMPLEMENTACION.md y PASO_A_PASO.md.
window.APP_CONFIG = {
  // Entra ID > Registros de aplicaciones > Checklist camionetas
  clientId: '40e5e24a-d1ea-45d8-b015-deabc81d28b0',
  tenantId: 'd23fcec5-6c9d-4ffe-9171-10866a7ef413',
  redirectUri: 'https://mauriciotorque.github.io/checklist-camionetas/',

  // Sitio de SharePoint: https://metaltorque.sharepoint.com/sites/ChecklistCamionetas
  siteHostname: 'metaltorque.sharepoint.com',
  sitePath: '/sites/ChecklistCamionetas',

  // Rutas dentro de la biblioteca "Documentos" de ese sitio
  workbookPath: 'Checklists/Registro_Checklists_Camionetas.xlsx',
  photosFolder: 'Checklists/Fotos'
};
