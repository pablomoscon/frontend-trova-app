const SubmitButton = ({ text }: { text: string }) => (
  <button
    type='submit'
    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
  >
    {text}
  </button>
);

export default SubmitButton;
