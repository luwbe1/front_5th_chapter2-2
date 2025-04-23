interface Props {
  children: React.ReactNode;
}

export const CardBox = ({ children, ...rest }: Props) => (
  <div className="bg-white p-4 rounded shadow" {...rest}>
    {children}
  </div>
);
