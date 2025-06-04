import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, message: string) => {
  Swal.fire({
    title,
    html: `<p class="text-gray-700 text-base">${message}</p>`,
    iconHtml: `
      <div class="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mx-auto mb-4">
        <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'Ok',
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-gray-900 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-gray-900 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
    didClose: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });
};

export const showErrorAlert = (title: string, message: string) => {
  Swal.fire({
    title,
    html: `<p class="text-gray-700 text-base">${message}</p>`,
    icon: 'error',
    showConfirmButton: true,
    confirmButtonText: 'Ok',
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-3xl font-bold text-red-600 mb-2',
      htmlContainer: 'text-gray-700 text-md',
      confirmButton:
        'bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });
};


export const showConfirmationDialog = async (
  title: string = '¿Estás seguro?',
  message: string = 'Esta acción no se puede deshacer.',
  confirmButtonText: string = 'Sí, confirmar'
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl shadow-lg p-8 bg-white',
      title: 'text-2xl font-bold text-gray-900',
      confirmButton: 'bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all duration-300 font-semibold',
      cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-all duration-300 font-semibold',
    },
    buttonsStyling: false,
  });

  return result.isConfirmed;
};
