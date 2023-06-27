import { Button } from 'antd'

const Home: React.FC = () => {
  return (
    <div className='layout-internal'>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page content.</p>
      <div className='App'>
        <Button type='primary'>Button</Button>
      </div>
    </div>
  )
}

export default Home
