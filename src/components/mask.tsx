export const Mark = ({
  value,
  keyword,
}: {
  value: string;
  keyword: string;
}) => {
  if (!keyword) return <>{value}</>;
  const valArr = value.split(keyword);
  return (
    <>
      {valArr.map((str, index) => {
        return (
          <span key={index}>
            {str}
            {index !== valArr.length - 1 && (
              <span style={{ color: "red" }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
