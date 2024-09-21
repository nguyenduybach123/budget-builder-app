import { TableCell } from "./components/Builder/TableCell"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="md:px-8 lg:px-16 font-semibold">
      <div className="mx-auto">
        <Header />
        <TableCell />
      </div>
    </div>
  )
}

export default App
