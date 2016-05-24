import React, { Component } from 'react';
import { connect } from 'react-redux';
import { component as Counter, resetAction } from './components/counter';

export default connect(state => state)(class extends Component {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="counters">
                <Counter {...this.props} />
                <Counter {...this.props} />
                <Counter {...this.props} />
                <button onClick={() => this.props.dispatch(resetAction())}>Reset</button>
            </section>
        );

    }

});
