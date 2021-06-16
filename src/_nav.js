const nav =  {
  items: [
    {
      title: true,
      name: "Servicios Ofrecidos",
      wrapper: {
        element: "",
        attributes: {},
      },
    },
    
    {
      name: "Mis Servicios",
      url: "/private/servicios",
      icon: "icon-list",
     
        /* {
          name: "Resoluciones",
          url: "/recursos/resoluciones",
          icon: "icon-puzzle",
        },*/

       
    },
    
    {
      name: "Notificaciones",
      url: "/private/notificacion",
      icon: "icon-bell",
    },
    /*
    {
      name: "Transferencias Regantes",
      url: " ",
      icon: "icon-puzzle",
      children: [
        {
          name: "Solicitud Transf",
          url: "/public/solicitud",
          icon: "icon-drop",
        },
        {
          name: "Informar Pago",
          url: "/public/informarpago",
          icon: "icon-drop",
        },
      ],
    },*/
  ],
};

export default nav;