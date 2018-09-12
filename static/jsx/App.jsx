class App extends React.Component {
  constructor() {
    super()

    this.idSequence = 0
    this.state = {
      records: [],
      showDetails: false,
      currentRecord: {}
    }

    var xhttp = new XMLHttpRequest();
    var source;
    xhttp.onreadystatechange = function () {
       if (xhttp.readyState == 4 && xhttp.status == 200) {
          source = JSON.parse(xhttp.responseText);
       }
    }
    xhttp.open("GET", "/GET", true);
    xhttp.send();
    this.state.records = source;

    this.actions = {
      master: {
        create: this.create.bind(this),
        edit: this.edit.bind(this),
        delete: this.delete.bind(this)
      },
      details: {
        updateValue: this.updateValue.bind(this),
        save: this.save.bind(this),
        cancel: this.cancel.bind(this)
      }
    };
  }

  nextId() {
    return ++this.idSequence
  }

  create() {
      var xhttp = new XMLHttpRequest();
      var response;
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText);
          }
        };
      xhttp.open("POST", "/ADD", true);
      xhttp.send();
      var record = response[0];
      this.setState({ currentRecord: record, showDetails: true })
  }

  edit(record) {
    let copy = Object.assign({}, record)
    this.setState({ currentRecord: copy, showDetails: true })
  }

  delete(record) {
    let records = this.removeFromRecords(this.state.records, record)
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/DELETE?ID=" + record.id, true);
    xhttp.send();
    this.setState({ records: records })
  }

  updateValue(property, event) {
    let record = this.state.currentRecord
    record[property] = event.target.value
    this.setState({ currentRecord: record })
  }

  save(record) {
    let records = this.removeFromRecords(this.state.records, record)
    records.push(record)
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/EDIT?firstName=" + record.firstName + "& lastName=" + record.lastName + "& shirtSize=" + record.shirtSize + "&shirtColor=" + record.shirtColor + "&id=" + record.id, true);
    xhttp.send();
    this.setState({ records: records })
    this.cancel()
  }

  cancel() {
    this.setState({ currentRecord: this.cleanRecord(), showDetails: false })
  }

  cleanRecord() {
    return {id: '', firstName: '', lastName: '', shirtSize: '', shirtColor: ''}
  }

  removeFromRecords(records, record) {
	return this.state.records.filter(currentRecord => currentRecord.id !== record.id)
  }
  
  render() {
    return (
      <div>
        <MasterView records={this.state.records} actions={this.actions.master} />
        {this.state.showDetails && <DetailsView record={this.state.currentRecord} actions={this.actions.details} /> }
      </div>
    )
  }
}