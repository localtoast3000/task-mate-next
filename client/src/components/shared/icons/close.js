export default function CloseIcon({ style = {}, className = '', ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 96 960 960'
      className={className}
      style={style}
      {...props}>
      <path
        xmlns='http://www.w3.org/2000/svg'
        d='m249 873-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z'
      />
    </svg>
  );
}
