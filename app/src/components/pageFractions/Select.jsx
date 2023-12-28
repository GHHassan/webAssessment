/**
 * Select component
 * 
 * This component recieves the options and value
 * from the parent component then, styles and renders
 * a select element with the options.
 *  
 * @author Ghulam Hassan Hassani <w20017074>
 */

function Select(props) {
  const { options, value, onChange } = props
  return (
    <div className="flex items-center mb-4">
      <label className="text-lg font-semibold mr-4">Filter by Content Type:</label>
        <select className="block md:inline-block p-2 m-5 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={value} onChange={onChange}>
          <option value="">All</option>
          {options.map((option) => (
            <option key={option.type_id}>{option.type_name}</option>
          ))}
        </select>
      </div>
  )
}

export default Select