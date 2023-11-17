interface HomeContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const HomeContainer = ({ children }: HomeContainerProps): JSX.Element => {
  return (
    <div className="z-[1] grid gap-x-4 gap-y-2 sm:grid-cols-2">{children}</div>
  );
};

export default HomeContainer;
