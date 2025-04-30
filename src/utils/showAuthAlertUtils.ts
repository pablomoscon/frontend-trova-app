
import Swal from "sweetalert2";

export const showSignupSuccessAlert = () => {
  return Swal.fire({
    title: 'Registro exitoso',
    html: '<p class="text-gray-700 text-base">Tu cuenta ha sido creada correctamente. ¡Bienvenido!</p>',
    iconHtml: `
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,
    confirmButtonText: 'Continuar',
    showConfirmButton: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-gray-900 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-gray-900 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });
};

export const showSignupErrorAlert = () => {
  return Swal.fire({
    title: 'Error al registrarse',
    html: '<p class="text-gray-700 text-base">No pudimos crear tu cuenta. Por favor, intenta de nuevo.</p>',
    iconHtml: `
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    `,
    confirmButtonText: 'Intentar de nuevo',
    showConfirmButton: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-gray-900 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-gray-900 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });
};


export const showLoginSuccessAlert = () => {
  return Swal.fire({
    title: 'Ingreso exitoso',
    html: '<p class="text-gray-700 text-base">Has iniciado sesión correctamente.</p>',
    iconHtml: `
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,
    confirmButtonText: 'Continuar',
    showConfirmButton: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-gray-900 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-gray-900 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });
};

export const showLoginErrorAlert = () => {
  Swal.fire({
    title: 'Error al iniciar sesión',
    html: '<p class="text-gray-700 text-base">Usuario o contraseña incorrectos. Inténtalo de nuevo.</p>',
    iconHtml: `
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    `,
    confirmButtonText: 'Intentar de nuevo',
    showConfirmButton: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-gray-900 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-gray-900 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });
}


  export const showTokenExpiredAlert = () => {
    Swal.fire({
      title: 'Tu sesión ha expirado',
      html: '<p class="text-gray-700 text-base">Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Iniciar sesión',
      customClass: {
        popup: 'rounded-2xl shadow-lg p-8 bg-white',
        title: 'text-3xl font-bold text-red-600 mb-2',
        htmlContainer: 'text-gray-700 text-md',
        confirmButton:
          'bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
      },
      buttonsStyling: false,
      didClose: () => {
        localStorage.removeItem('user');
        window.location.href = '/sign-in'; 
      },
    });
  };

