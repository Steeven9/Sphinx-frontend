import React from 'react';
import '../css/App.css';

class RedirectionTest extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    /**
     * Used for testing redirection
     */
    render() {
        return (
            <div className="RedirectionTest">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget efficitur leo. Integer mattis urna a risus semper, in pretium ligula scelerisque. Suspendisse nibh enim, suscipit nec leo non, mattis aliquam lacus. Vivamus ullamcorper fermentum eleifend. Cras euismod, tellus vel fermentum vulputate, est dui tincidunt eros, a vehicula nisi nunc ac nisi. Nulla aliquet nibh ac rhoncus sodales. Phasellus in velit in eros ultricies feugiat. Donec purus lorem, elementum vel eros non, iaculis ultrices risus. Duis felis elit, malesuada nec libero id, dictum mollis purus. Nam fermentum, ex ac congue finibus, lectus velit molestie diam, eu maximus nibh nulla id eros. Phasellus quis ligula libero.

Nunc interdum fermentum lectus, ut rutrum neque vulputate eu. Phasellus dapibus vitae turpis sit amet mattis. Vestibulum nec rutrum justo. Mauris eget ultrices metus. Mauris facilisis nisi viverra, rutrum sapien id, imperdiet nisl. Nullam est nulla, aliquet et risus id, suscipit vulputate massa. Nam consequat commodo gravida. Nam eu est imperdiet, posuere ipsum ac, laoreet orci. Mauris et ornare libero. Curabitur malesuada, ipsum non volutpat venenatis, magna lorem posuere augue, vel mollis quam enim sit amet elit. Nulla facilisi. Etiam pulvinar a lacus ut sodales. In hac habitasse platea dictumst. Curabitur lacinia condimentum ante, sed semper massa vehicula ut.

Integer nec ante non nisi feugiat tempor sit amet at dolor. Pellentesque accumsan urna ut mauris dictum, eu mollis ex egestas. Aliquam sed risus venenatis, gravida elit ac, congue velit. Proin scelerisque eros justo, non sollicitudin augue fringilla quis. Aenean ultrices, quam eu porttitor ullamcorper, lectus felis maximus risus, vel aliquet diam ex vitae dui. Etiam eleifend, justo sit amet tempus sollicitudin, orci velit tristique tortor, quis porta eros lectus a lectus. Vivamus ut dapibus purus. Nulla maximus accumsan magna at interdum. Ut eu lacus placerat, condimentum mauris eget, dapibus metus. Integer tempor massa nunc, nec vehicula sem consectetur et. Etiam iaculis iaculis lectus, vitae molestie lacus hendrerit at. Sed venenatis ornare lorem sit amet placerat. Donec sit amet ante facilisis, interdum purus nec, molestie lectus. Donec viverra sit amet nisl vel pharetra. Vestibulum pulvinar urna eleifend turpis ornare, vel rutrum nibh efficitur. Duis tristique ligula elit, nec rutrum ipsum ullamcorper sit amet.

Ut fermentum lacus vel erat blandit ullamcorper. Vestibulum eu tempus ante. Fusce mollis suscipit tortor quis cursus. Vivamus in dui maximus, pulvinar erat non, eleifend nisi. Sed ultrices sollicitudin sapien nec sollicitudin. In faucibus urna vitae tempus condimentum. Maecenas sed eros non lorem rutrum vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ligula nibh, lobortis non bibendum id, varius ut sapien. Pellentesque eget ipsum sapien. Sed lobortis nisl ac metus mollis porttitor viverra eget neque. Cras tempor ante non tortor ultrices rutrum. Curabitur rutrum porttitor dui eget ornare. Duis accumsan nec dolor eget luctus. Proin vel velit at dolor facilisis molestie eget vel velit. Sed euismod sapien at dolor vehicula, at sagittis elit blandit.

Praesent vel velit quis turpis pharetra lacinia. Etiam accumsan, ligula ac volutpat volutpat, urna turpis volutpat erat, eu feugiat ante nisl nec erat. Donec luctus sed ante eu interdum. In in lobortis nulla, ut dignissim odio. Vivamus nunc nulla, vestibulum ac finibus id, semper in dui. Morbi mollis velit sit amet lectus feugiat porta. Sed tincidunt metus purus, rutrum pulvinar risus viverra ut. Aliquam id sem sed elit viverra imperdiet. Vestibulum id augue nec mi iaculis consectetur.
                <button onClick={this.props.redirectDashboard}>Test</button>
            </div>
        );
    }
}

export default RedirectionTest;