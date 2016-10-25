var Card = React.createClass({
    displayName: "Card",

    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            component.setState(data);
        });
    },
    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement("img", { src: this.state.avatar_url, width: "80" }),
            React.createElement(
                "h3",
                null,
                this.state.name
            ),
            React.createElement("hr", null)
        );
    }
});

var Form = React.createClass({
    displayName: "Form",

    handleSubmit: function (e) {
        e.preventDefault();
        var loginInput = this.refs.login;
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function () {
        return React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", { placeholder: "github login", ref: "login" }),
            React.createElement(
                "button",
                null,
                "Add"
            )
        );
    }
});

var Main = React.createClass({
    displayName: "Main",

    getInitialState: function () {
        return { logins: [] };
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
            return React.createElement(Card, { key: login.id, login: login.name });
        });
        return React.createElement(
            "div",
            null,
            React.createElement(Form, { addCard: this.addCard }),
            cards
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('container'));