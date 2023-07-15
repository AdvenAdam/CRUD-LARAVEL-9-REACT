import NewsList from '@/Components/HomePage/NewsList';
import Paginate from '@/Components/HomePage/Paginate';
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';

const HomePage = (props) => {
  return (
    <div className='min-h-screen bg-slate-60'>
      <Head title={props.title} />
      <Navbar user={props.auth.user} />
      <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch 
      items-center gap-4 p-4'>
        <NewsList News={props.news.data} />
      </div>
      <div className='flex justify-center items-center'>
        <Paginate meta={props.news.meta} />
      </div>
    </div>
  )
}
export default HomePage