class DetailsView extends React.Component {
  constructor(props) {
    super()
    this.props = props
  }
  
  render() {
    return (
      <div>
        <label>ID</label><br/>
        <input type="text" value={this.props.record.id}/>
        <br/>
        <label>First Name</label><br/>
        <input type="text" value={this.props.record.firstName} onChange={event => this.props.actions.updateValue('firstName', event)} />
        <br/>
        <label>Last Name</label><br/>
        <input class="text" type="text" value={this.props.record.lastName} onChange={event => this.props.actions.updateValue('lastName', event)} />
                <br/>
        <label>Shirt Size</label><br/>
        <select class="text" type="text" value={this.props.record.shirtSize} onChange={event => this.props.actions.updateValue('shirtSize', event)} >
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
        </select><br/>
        <label>Shirt Colour</label><br/>
        <input type="text" value={this.props.record.shirtColor} onChange={event => this.props.actions.updateValue('shirtColor', event)} /><br/>
        <button onClick={ event => this.props.actions.save(this.props.record) }>Save</button>
        <button onClick={ event => this.props.actions.cancel() }>Cancel</button>
      </div>
    )
  }
}