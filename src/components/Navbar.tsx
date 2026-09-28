
export default function Navbar() {
  return (
    <div className="flex flex-row gap-5 bg-background text-text px-6 py-4">
        <h1 className="button"><a href="/">Dette er en navbar</a></h1>
        <ul className="flex flex-row gap-4">
            <li className="button"><a href="/">Home</a></li>
            <li className="button"><a href="/about">About</a></li>
            <li className="button"><a href="/contact">Contact</a></li>
        </ul>
    </div>
  )
}
