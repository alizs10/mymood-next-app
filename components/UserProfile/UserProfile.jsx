import { isNull } from "lodash";

const UserProfile = ({ pageType, user, moodLength, followers, followings, setUserSettingsVisibility, isFollowed, handleFollowUser, handleUnFollowUser }) => {

    return (
        <section className="grid grid-cols-4 md:grid-cols-8 items-center md:items-start gap-2 text-slate-700 mx-2">

            <div className="col-span-1 md:col-span-2 flex items-center">
                <div className="rounded-xl w-full flex-center border-2 p-4 sm:p-5 md:p-6">
                    <i className="fa-light fa-face-meh-blank text-4xl sm:text-6xl md:text-7xl"></i>
                </div>
            </div>

            <div className="col-span-3 md:col-span-2 flex flex-col gap-y-2">
                <span className="text-sm lg:text-base font-bold">{`کاربر ${user.id}`}</span>
                <span className="text-xs lg:text-sm text-gray-500">{isNull(user.bio) ? "اینجا درباره خودت بنویس" : user.bio}</span>
            </div>


            <div className="col-span-4 grid grid-cols-4 gap-y-2 lg:gap-y-4">
                <div className="col-span-4 flex gap-x-2 justify-evenly">
                    <span className="flex flex-col gap-1 text-xs text-center">
                        <span className="font-bold text-sm">{moodLength}</span>
                        <span>مود ها</span>
                    </span>
                    <span className="flex flex-col gap-1 text-xs text-center">
                        <span className="font-bold text-sm">{followers}</span>
                        <span>دنبال کنندگان</span>
                    </span>
                    <span className="flex flex-col gap-1 text-xs text-center">
                        <span className="font-bold text-sm">{followings}</span>
                        <span>دنبال کردن</span>
                    </span>
                </div>
                {pageType == "0" ? (
                    <button className="col-span-4 btn border-2 h-fit border-amber-400 text-amber-500 flex-center text-xs" onClick={() => setUserSettingsVisibility(true)}>
                        <i className="fa-light fa-edit text-base"></i>
                        <span className="mr-2">ویرایش کردن</span>
                    </button>
                ) : (
                    isFollowed ? (
                        <button className="col-span-4 btn border-2 h-fit border-amber-400 text-amber-500 flex-center text-xs" onClick={() => handleUnFollowUser(user.id)}>
                            <span key={0}>
                                <i className="fa-light fa-user-check text-base"></i>
                            </span>
                            <span className="mr-2">دنبال نکردن</span>
                        </button>
                    ) : (
                        <button className="col-span-4 btn border-2 h-fit border-amber-400 text-amber-500 flex-center text-xs" onClick={() => handleFollowUser(user.id)}>
                            <span key={1}>
                                <i className="fa-light fa-user-plus text-base"></i>
                            </span>
                            <span className="mr-2">دنبال کردن</span>
                        </button>
                    )
                )}
            </div>

        </section>
    );
}

export default UserProfile;