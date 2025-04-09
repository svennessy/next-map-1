import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
      <ul className="flex pt-4 gap-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/map">Map</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
