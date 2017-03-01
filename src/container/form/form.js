/**
 * Created by long-mac on 2017/2/27.
 */

import DataForm from '../../components/dataform/DataForm';
import { connect } from 'react-redux';
import {fetchQueryArgs} from './actions';

fetchQueryArgs();

const FormBridge = connect()(DataForm);

export default FormBridge;

