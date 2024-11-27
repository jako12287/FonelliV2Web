export const CustomAlertLogOut = async (dispatch:any, logout:any, navigate:any) => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
      try {
        await dispatch(logout());
        // Redirige al usuario a la pantalla de login
        navigate('/'); // Usa la ruta correspondiente en tu app
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };
  