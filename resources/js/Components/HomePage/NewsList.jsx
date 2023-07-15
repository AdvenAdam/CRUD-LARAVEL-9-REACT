import { Link } from "@inertiajs/react"

const NewsList = ({ News, isDashboard = false }) => {
  const isNews = (news) => (
    news.map((data, i) => (
      <div className="card w-full lg:w-96 bg-base-100 shadow-xl" key={i}>
        <figure><img className="w-full" src={`https://picsum.photos/800/360?random=${i}`} alt="News" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            {data.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{data.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-inline">{data.category}</div>
            {
              !isDashboard ? (
                <div className="badge badge-outline">{data.author}</div>
              ) : (
                <>
                  <div className="badge badge-outline">
                    <Link href={route('edit.news')} method="get" data={{ id: data.id }} as="button">
                      Edit
                    </Link>
                  </div>
                  <div className="badge badge-outline">
                    <Link href={route('delete.news')} method="post" data={{ id: data.id }} as="button">
                      Delete
                    </Link>
                  </div>
                </>
              )
            }

          </div>
        </div>
      </div >
    ))
  )
  return (News ? isNews(News) : <div>No News Available</div>)
}
export default NewsList