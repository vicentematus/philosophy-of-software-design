import { EssayLayout } from './components/EssayLayout'
import Essay from './content/essay.mdx'
import './styles/essay.css'

export default function App() {
  return (
    <EssayLayout>
      <Essay />
    </EssayLayout>
  )
}
