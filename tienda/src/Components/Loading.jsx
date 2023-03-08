import { Col, Row, Spinner } from "reactstrap"


const Loading = ({colorPrimary,colorSecondary}) => {
  return (
    <Row className='mt-5 pt-5'><Col xs={12}> 
<div
        style={{ width: "100%", height: "80vh" }}
        className="mt-5 pt-5 mx-auto text-center"
      >
        <Spinner color={colorPrimary ?? 'primary'} type="grow">
          Loading...
        </Spinner>
        <Spinner color={colorSecondary ?? 'warning'} type="grow">
          Loading...
        </Spinner>
      </div>
      </Col></Row>
  )
}

export default Loading
