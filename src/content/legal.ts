/**
 * Textos legales provisionales. Los datos identificativos no se inventan:
 * se muestran como [DATO PENDIENTE] hasta que CONEXUM apruebe los textos definitivos.
 */

export const legalHero = {
  eyebrow: "INFORMACIÓN LEGAL",
  title: "Aviso legal, privacidad y cookies.",
  lead: "Versión provisional pendiente de revisión jurídica. Los datos identificativos de la sociedad se publicarán cuando estén aprobados.",
};

export const legalSections: { id: string; title: string; paragraphs: string[] }[] = [
  {
    id: "aviso-legal",
    title: "Aviso legal",
    paragraphs: [
      "Titular del sitio web: CONEXUM. Razón social, NIF y domicilio: [DATO PENDIENTE].",
      "Este sitio web tiene carácter informativo y presenta los servicios de ingeniería de redes de CONEXUM. Las tecnologías de terceros se citan únicamente para describir experiencia técnica y no implican relación comercial, certificación ni partnership con sus fabricantes.",
      "Para cualquier consulta sobre este sitio puede escribir a {email} (dirección provisional).",
    ],
  },
  {
    id: "privacidad",
    title: "Política de privacidad",
    paragraphs: [
      "Responsable del tratamiento: CONEXUM. Datos identificativos completos: [DATO PENDIENTE].",
      "Finalidad: los datos que facilite a través del formulario de contacto o por correo electrónico se utilizan únicamente para atender su solicitud y mantener la conversación técnica o comercial que usted inicia.",
      "Legitimación: su consentimiento expreso al enviar la solicitud. Los datos no se ceden a terceros salvo obligación legal ni se utilizan para comunicaciones comerciales no solicitadas.",
      "Conservación: durante el tiempo necesario para responder a su solicitud y, en su caso, mientras se mantenga la relación profesional.",
      "Derechos: puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {email}. También puede presentar una reclamación ante la Agencia Española de Protección de Datos.",
    ],
  },
  {
    id: "cookies",
    title: "Política de cookies",
    paragraphs: [
      "Este sitio web no utiliza cookies de analítica, publicidad ni seguimiento. Solo puede emplear almacenamiento técnico imprescindible para servir las páginas correctamente.",
      "Si en el futuro se incorporan herramientas de analítica, se solicitará su consentimiento previo mediante un aviso de cookies y se actualizará esta política.",
    ],
  },
];
