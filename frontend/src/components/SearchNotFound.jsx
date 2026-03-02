import images from '../assets/assets'
const SearchNotFound = () => {
  return (
    <div className="text-center mt-12">  
      <div className="flex justify-center mt-12">
        <img 
          src={images.searchnotfound} 
          alt="no_repo" 
          className='h-80 w-100'
        />
      </div>
      <h1 className="text-3xl font-semibold pt-10">
       Your search did not find any matches.
      </h1>
    </div>
  )
}

export default SearchNotFound