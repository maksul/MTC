import {Link} from 'react-router-dom';
// import moment from 'moment';

const AllProfilesRender = ({profiles, category}) => {

    if (profiles.length === 0) {
        return (
            <b>No profile yet.</b>
        )
    } else {
        return (
            <div className="profiles-container">
                <ul>
                    {profiles.sort((a, b) => Number(a.position_level) - Number(b.position_level)).map(profile => (
                        <li key={profile._id} className="profiles-box">
                            <Link to={`/management-profile/${profile.slug}`}>
                                <div className="profile-photo-wrapper">
                                    <img src={profile.photo} alt={profile.name}/>
                                </div>
                                <div>
                                    <span>{profile.name}</span>
                                    <span><small>{profile.position}</small></span>
                                </div>
                            </Link>

                        </li>
                    ))
}
                </ul>
            </div>
        )
    }
}

export default AllProfilesRender;
