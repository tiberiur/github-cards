var Card = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            component.setState(data);
        })
    },
    render: function () {
        return (
            <div>
                <img src={this.state.avatar_url} width="80"/>
                <h3>{this.state.name}</h3>
                <hr/>
            </div>
        )
    }
});

var Form = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var loginInput = this.refs.login;
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="github username" ref="login"/>
                <button>Add</button>
            </form>
        )
    }
});

var Main = React.createClass({
    getInitialState: function () {
        return {logins: []};
    },
    nextId: function () {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    addCard: function (loginToAdd) {
        var arr = this.state.logins;
        arr.push({
            id: this.nextId(),
            name: loginToAdd
        });
        this.setState(arr);
    },
    render: function () {
        var cards = this.state.logins.map(function (login) {
            return (<Card key={login.id} login={login.name} />);
        });
        return (
            <div>
                <Form addCard={this.addCard}/>
                {cards}
            </div>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('container')
);
