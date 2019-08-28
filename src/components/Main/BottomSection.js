import React from 'react'

export class BottomSection extends React.Component {
    constructor() {
        super();
        
        this.state = {
            expanded: false
        }

        this.toggleSection = this.toggleSection.bind(this);
    }

    toggleSection() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        const {title, children, expands} = this.props;
        const {expanded} = this.state;
        
        return(
            <div className={'bottom-section-wrap ' + (!expanded ? 'collapsed' : '')}>
                <h3>{title}</h3>
                {children}
                {expands &&
                    <span className='material-icons expand'  onClick={this.toggleSection}>
                        {expanded ? 'keyboard_arrow_down' :  'keyboard_arrow_up'}
                    </span>
                }
            </div>
        );
    }
}