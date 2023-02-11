import React from 'react'
import { Col, FormGroup, Input, Row,Form,Button,Label } from 'reactstrap';

const Search = ({handleSubmit,search,setSearch,verLista}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={8}>
                <FormGroup floating>
                  <Input
                    id="search"
                    className="rounded"
                    name="search"
                    placeholder="Buscar"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <Label for="search" className="text-muted">
                    Buscar...
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={12} sm={4}>
                <Button
                  color="success"
                  outline
                  className="rounded"
                  type="submit"
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
          <Button
            onClick={verLista}
            color="primary"
            outline
            size="sm"
            className="mt-4 rounded"
          >
            Ver todos
          </Button>
    </>
  )
}

export default Search
