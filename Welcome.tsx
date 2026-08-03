import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <div className="px-2 py-1 flex justify-between items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT6DocxeQ1g7Lto1ctPa1-CH-frckMkOgbzZfZqvHLOA&s=10"
          alt="logo"
          className="h-[50px] rounded-4xl"
        />
      </div>
      <div className='bg-gray-100 px-3 pt-5'>
        <div>
          <h1 className="text-blue-800 font-bold text-3xl text-center">Welcome To CodeYogi Assignment Portal.</h1>
          <p className="font-bold mt-2 text-center">
            A seamless platform for to mentage manage assignments and to student
            to do their progress effciently.
          </p>
        </div>

        <div className="flex flex-col gap-3 my-5">
          <Link to="/student/login" className="w-full text-center bg-blue-700 text-gray-100 font-bold text-md py-2 rounded-lg">Get Started as Student</Link>
          <Link to="/mentor/login" className="w-full text-center bg-orange-700 text-gray-100 font-bold text-md py-2 rounded-lg">Mentor Portal Access</Link>
        </div>

        <div className="flex flex-col gap-3 pb-5">
          <div className="p-3 bg-white rounded-lg w-full">
            <h1 className="font-bold text-md text-center"><span>📝</span>Create & Manage</h1>
            <p>Mentors can easily set deadlines and create detailed assignmnets.</p>
          </div>

          <div className="p-3 bg-white rounded-lg w-full">
            <h1 className="font-bold text-md text-center"> <span> 🚀 </span>Quick Submissions</h1>
            <p>Studens can submit Github or Google Drive links in one click.</p>
          </div>

          <div className="p-3 bg-white rounded-md w-full">
            <h1 className="font-bold text-md text-center"><span>📈</span>Track Status</h1>
            <p>Instantly see who has submitted and who is pending.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
