import { Link } from "@inertiajs/react"

const Paginate = ({ meta }) => {

  const Prev = meta.links[0].url //first array from links
  const Next = meta.links[meta.links.length - 1].url //last array from links
  const Curr = meta.current_page

  return (
    <div className="join">
      {Prev && <Link href={Prev} className="join-item btn btn-outline">«</Link>}
      <button className="join-item btn btn-outline">Page {Curr}</button>
      {Next && <Link href={Next} className="join-item btn btn-outline">»</Link>}
    </div>
  )
}
export default Paginate