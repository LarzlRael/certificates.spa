interface DropdownProps {
  options: string[]
  value: string
  title: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Dropdown = ({
  options,
  value,
  onChange,
  title,
}: DropdownProps) => {
  return (
    <div>
      <label htmlFor="">{title}</label>
      <br />
      <select name="" id="" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
