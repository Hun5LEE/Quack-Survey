interface ILoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner = ({ fullScreen = true }: ILoadingSpinnerProps) => {
  const spinnerContainerClass = fullScreen
    ? "fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50"
    : "flex justify-center items-center w-full h-full";

  return (
    <div className={spinnerContainerClass}>
      <div className="absolute left-0 top-0 h-full w-full bg-white"></div>
      <div className="h-6 w-6 animate-spin rounded-full border-t-4 border-solid border-n-dark-gray"></div>
    </div>
  );
};
export default LoadingSpinner;
