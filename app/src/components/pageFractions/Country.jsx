/**
 * Country component
 * 
 * This component is used to render each country
 * in the countries page. It takes the country
 * object as a prop, then styles and renders the country name
 * and flag.
 *  
 * @author Ghulam Hassan Hassani <w20017074>
 * 
 */

function Country({ country }) {
  
  return (
    <div className="border-2 border-grey rounded-md p-4 my-2 mx-auto text-center max-w-md w-full cursor-pointer">
      <h3 className="text-xl font-bold">{country.country}</h3>
      {country.flag && (
        <img
          src={country.flag}
          alt={`${country.country} Flag`}
          className="mt-2 max-w-full h-auto w-16 mx-auto"  
        />
      )}
    </div>
  )
}

export default Country



