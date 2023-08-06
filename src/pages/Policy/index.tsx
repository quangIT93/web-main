import React from 'react';
import Navbar from './components/Navbar';
import Footer from '../../components/Footer/Footer';
// @ts-ignore
import { ScrollContext } from '#utils';
import './style.scss';
import Category from './components/Category';

// firebase
import { getAnalytics, logEvent } from 'firebase/analytics';

// import siteApi from 'api/siteApi';

export interface CurrentCategoryActiveProps {
  isAboutUs: boolean;
  privaryPolicy: boolean;
  termsOfUse: boolean;
}

const Policy: React.FC = () => {
  const titleOneRef = React.useRef<HTMLDivElement>(null);
  const titleTwoRef = React.useRef<HTMLDivElement>(null);
  const titleThreeRef = React.useRef<HTMLDivElement>(null);
  const [categoriesState, setCategoriesState] =
    React.useState<CurrentCategoryActiveProps>({
      isAboutUs: true,
      privaryPolicy: false,
      termsOfUse: false,
    });
  // @ts-ignore
  const { scrollY } = React.useContext(ScrollContext);

  React.useEffect(() => {
    const getActiveCategory = () => {
      const { current: firstTitleEl } = titleOneRef;
      const { current: secondTitleEl } = titleTwoRef;
      const { current: thirdTitleEl } = titleThreeRef;

      if (firstTitleEl && secondTitleEl && thirdTitleEl) {
        if (
          scrollY - firstTitleEl.offsetTop >= 0 &&
          scrollY - secondTitleEl.offsetTop < 0
        ) {
          setCategoriesState({
            isAboutUs: true,
            privaryPolicy: false,
            termsOfUse: false,
          });
        }
        if (
          scrollY - secondTitleEl.offsetTop >= 0 &&
          scrollY - thirdTitleEl.offsetTop < 0
        ) {
          setCategoriesState({
            isAboutUs: false,
            privaryPolicy: true,
            termsOfUse: false,
          });
        }
        if (scrollY - thirdTitleEl.offsetTop >= 0) {
          setCategoriesState({
            isAboutUs: false,
            privaryPolicy: false,
            termsOfUse: true,
          });
        }
      }
    };
    getActiveCategory();
  }, [scrollY]);

  const analytics: any = getAnalytics();

  React.useEffect(() => {
    // Cập nhật title và screen name trong Firebase Analytics
    document.title = 'HiJob - Chính sách công ty';
    logEvent(analytics, 'screen_view' as string, {
      // screen_name: screenName as string,
      page_title: '/web_policy' as string,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="policy" style={{ marginBottom: '10px' }}>
        <div className="policy__category-fake"></div>
        <Category
          isAboutUs={categoriesState.isAboutUs}
          privaryPolicy={categoriesState.privaryPolicy}
          termsOfUse={categoriesState.termsOfUse}
        />
        <div className="policy__content">
          <section id="about-us">
            <h2 ref={titleOneRef} className="`content__title`">
              Về HiJob
            </h2>
            <span className="content__additional-info">Sứ mệnh</span>
            <span className="content__additional-info">Mục tiêu</span>
          </section>
          <section id="privacy-policy">
            <h2 ref={titleTwoRef} className="content__title">
              Chính sách bảo mật
            </h2>
            <p className="content__body">
              Chào mừng bạn đến với ứng dụng tìm việc làm HiJob, được vận hành
              bởi Công ty TNHH NeoWorks (sau đây có thể được gọi là “NeoWorks”
              hoặc “Chúng tôi”). HiJob cam kết tôn trọng và cam kết bảo vệ dữ
              liệu cá nhân của người dùng. Chúng tôi cam kết sẽ thực hiện các
              biện pháp liên quan để bảo vệ dữ liệu cá nhân của người dùng tuân
              theo các quy định pháp luật áp dụng về bảo mật thông tin/dữ liệu
              cá nhân. Chính sách bảo mật này hay còn gọi là Quy chế quyền riêng
              tư (sau đây được gọi chung là “Quy chế”) được lập nhằm quy định
              cách thức chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và/hoặc xử
              lý dữ liệu khi bạn truy cập vào trang web HiJob.com của chúng tôi
              và tất cả các trang web phụ liên quan khác (“Nền tảng”). Bằng việc
              sử dụng các Dịch vụ, đăng ký Tài khoản với chúng tôi hoặc truy cập
              Nền tảng của chúng tôi, bạn xác nhận và đồng ý cho phép chúng tôi
              thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn
              như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ
              LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI LÒNG KHÔNG
              SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN TẢNG CỦA CHÚNG
              TÔI.
              <br />
              Chúng tôi có toàn quyền sửa đổi, bổ sung, cập nhật Quy chế này tại
              từng thời điểm. Nếu Chúng tôi thay đổi Quy chế này, chúng tôi sẽ
              đăng những thay đổi đó hoặc Quy chế Quyền riêng tư được sửa đổi
              trên Nền tảng của chúng tôi.
            </p>
            <h3 className="content__sub-title">
              1. Chúng tôi sẽ thu thập những dữ liệu nào?
            </h3>
            <p className="content__body">
              1.1 Những dữ liệu mà chúng tôi có thể thu thập bao gồm, nhưng
              không giới hạn các thông tin sau:
              <br />
              <ul className="sub-list">
                <li>
                  a) Thông tin cá nhân như thông tin tài khoản, họ và tên, thông
                  tin email, thông tin liên hệ, địa chỉ, giới tính, ngày sinh,
                  ảnh hồ sơ, số điện thoại di động. Ngoài thông tin đăng ký,
                  chúng tôi có thể hỏi bạn các thông tin cá nhân khác nếu bạn
                  đăng quảng cáo tuyển dụng hoặc các tính năng khác trên Nền
                  tảng của chúng tôi như thông tin về mức lương, bằng cấp, chứng
                  chỉ
                </li>
                <li>
                  b) Thông tin được gửi bởi hoặc liên quan đến (các) thiết bị
                  được bạn sử dụng truy cập và/hoặc sử dụng Nền tảng của chúng
                  tôi như địa chỉ IP, địa chỉ máy (URL) website của bạn, các
                  thông tin về trình duyệt, các địa chỉ bạn đã truy cập trên Nền
                  tảng, thời gian bạn hoạt động trên Nền tảng của chúng tôi;
                </li>
                <li>
                  c) Thông tin dữ liệu về vị trí như vị trí điện thoại di động
                  của bạn và/hoặc bất kỳ thông tin vị trí nào như khi bạn cho
                  phép mở tính năng vị trí điện thoại di động của bạn để chụp
                  và/hoặc chia sẻ vị trí của bạn với chúng tôi dưới dạng hình
                  ảnh hoặc video của bạn và tải nội dung đó lên Nền tảng;
                </li>
                <li>
                  d) Dữ liệu về lịch sử hội thoại, nội dung hội thoại giữa bạn
                  và (các) người dùng khác trên Nền tảng của chúng tôi khi bạn
                  sử dụng tính năng Chat để trao đổi thông qua chức năng Chat
                  trên Nền tảng, bao gồm nhưng không giới hạn các thông tin dưới
                  dạng văn bản, âm thanh, hình ảnh.
                </li>
                <li>
                  e) Bất kỳ thông tin, dữ liệu nào khác được tiết lộ bởi bạn khi
                  bạn đăng nhập để sử dụng các Dịch vụ hoặc trải nghiệm các tính
                  năng trên Nền tảng của chúng tôi.
                </li>
                <li>
                  f) Bất kỳ dữ liệu, thông tin tổng hợp khác về nội dung người
                  dùng sử dụng.
                </li>
              </ul>
            </p>
            <p className="content__body">
              1.2 Trong quá trình bạn sử dụng Nền tảng và Dịch vụ, chúng tôi có
              thể thu thập dữ liệu của bạn trong các trường hợp sau:
              <br />
              <ul className="sub-list">
                <li>
                  a) Khi bạn đăng ký và/hoặc mở một tài khoản với chúng tôi;
                </li>
                <li>
                  b) Khi bạn đăng ký và/hoặc sử dụng bất kỳ Dịch vụ trên Nền
                  tảng chúng tôi;
                </li>
                <li>
                  c) Khi bạn sử dụng bất kỳ tính năng hoặc chức năng nào có sẵn
                  trên Nền tảng của chúng tôi;
                </li>
                <li>d) Khi bạn sử dụng chức năng Chat trên Nền tảng;</li>
                <li>
                  e) Khi bạn đồng ý đăng ký, tham gia vào bất kỳ cuộc khảo sát,
                  cuộc thi, chiến dịch khuyến mãi hoặc chiến dịch tiếp thị nào
                  của chúng tôi;
                </li>
                <li>
                  f) Khi bạn đăng bất kỳ ý kiến, nhận xét nào về nội dung của
                  người dùng khác được tải lên Nền tảng hoặc khi bất kỳ người
                  dùng nào khác trên Nền tảng đăng bất kỳ nhận xét về nội dung
                  của bạn đã tải lên Nền tảng;
                </li>
                <li>
                  g) Khi bạn gửi khiếu nại cho chúng tôi hoặc khi bên thứ ba
                  khiếu nại về bạn hoặc nội dung của bạn trên Nền tảng;
                </li>
                <li>
                  h) Khi bạn gửi thông tin cá nhân của bạn cho chúng tôi vì bất
                  kỳ lý do gì.
                </li>
              </ul>
            </p>
            <p className="content__body">
              1.3 Bạn đồng ý không cung cấp cho chúng tôi bất kỳ thông tin nào
              không chính xác hoặc gây hiểu nhầm. Bạn phải thường xuyên cập nhật
              thông tin cá nhân của mình và thông báo cho chúng tôi về bất kỳ
              thông tin nào không chính xác hoặc khi có sự thay đổi. Chúng tôi
              có quyền yêu cầu bạn cung cấp những tài liệu cần thiết để xác minh
              thông tin cá nhân do bạn cung cấp.
            </p>
            <p className="content__body">
              1.4 Nếu bạn liên kết tài khoản của bạn trên Nền tảng của chúng tôi
              với tài khoản mạng xã hội của bạn hoặc sử dụng một số tính năng
              mạng xã hội nào của HiJob, chúng tôi có thể truy cập dữ liệu cá
              nhân về bạn mà bạn đã tự nguyện cung cấp cho các nhà cung cấp dịch
              vụ tài khoản mạng xã hội theo chính sách của họ và chúng tôi sẽ
              quản lý, sử dụng các dữ liệu cá nhân này của bạn theo Quy chế
              Quyền riêng tư này tại mọi thời điểm.
            </p>
            <h3 className="content__sub-title">
              2. Mục đích thu thập thông tin cá nhân
            </h3>
            <div className="content__body">
              Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý thông
              tin cá nhân của bạn vì một hoặc nhiều mục đích sau đây:
              <p className="content__body-indent content__body-dotsymbol">
                Nhằm mục đích vận hành, phân tích, đánh giá, cải thiện và nâng
                cấp Dịch vụ và trải nghiệm của người dùng trên Nền tảng của
                chúng tôi;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để nhận dạng và/hoặc xác minh danh tính người dùng;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để liên hệ cho mục đích hỗ trợ cung cấp Dịch vụ của chúng tôi
                và/hoặc quản lý mối quan hệ của bạn với chúng tôi hoặc việc sử
                dụng Dịch vụ của bạn với chúng tôi;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để tiến hành các hoạt động nghiên cứu, phân tích, đánh giá, phát
                triển dữ liệu trên Nền tảng của chúng tôi; Để nhận diện người
                dùng và quản lý thông tin tài khoản;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để nhận diện người dùng và quản lý thông tin tài khoản;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để xác định người dùng truy cập trên Nền tảng;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để phát hiện, điều tra và/hoặc ngăn chặn các hoạt động gian lận,
                phi pháp, thiếu sót hay hành vi sai trái nào, cho dù đã diễn ra
                hay chưa, có liên quan đến việc bạn sử dụng Dịch vụ của chúng
                tôi hay không hay bất kỳ vấn đề nào phát sinh từ quan hệ của bạn
                với chúng tôi;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để tiến hành các hoạt động nghiên cứu tiếp thị hoặc mục đích
                tiếp thị. Bạn có thể huỷ đăng ký nhận tiếp thị tại bất kỳ thời
                điểm nào bằng cách sử dụng chức năng huỷ đăng ký trong các tài
                liệu tiếp thị điện tử;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để gửi các thông báo hoặc thông tin mà chúng tôi cho rằng cần
                thiết hoặc bạn sẽ quan tâm bao gồm nhưng không giới hạn những
                thông tin về dịch vụ, chương trình ưu đãi và các gợi ý về tính
                năng, trừ khi bạn từ chối nhận những thông báo hoặc thông tin
                này;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Để đáp ứng các thủ tục pháp lý hoặc để tuân thủ hoặc theo quy
                định pháp luật hiện hành, và các yêu cầu của cơ quan nhà nước có
                thẩm quyền;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Và bất kỳ mục đích nào mà chúng tôi thông báo cho bạn tại thời
                điểm xin sự cho phép của bạn.
              </p>
            </div>
            <h3 className="content__sub-title">
              3. Các trường hợp chia sẻ thông tin cá nhân
            </h3>
            <div className="content__body">
              Chúng tôi có thể thu thập và tiết lộ thông tin của bạn cho bên thứ
              ba trong phạm vi cần thiết để thực hiện một số chức năng của chúng
              tôi, như:
              <p className="content__body-indent content__body-dotsymbol">
                Các đối tác cung cấp các dịch vụ xử lý, phân tích dữ liệu mà
                chúng tôi thuê để phục vụ cho hoạt động kinh doanh của chúng tôi
                như dịch vụ lưu trữ máy chủ của web;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Các đối tác cung cấp các dịch vụ liên quan đến việc gửi, nhận
                thông báo (bằng SMS, email, cuộc gọi) đến người dùng;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Các đối tác trong hoạt động marketing;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Các đơn vị được chúng tôi yêu cầu để bảo vệ an toàn và an ninh
                cho Dịch vụ;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Các chi nhánh, đơn vị trực thuộc và/hoặc công ty liên kết của
                chúng tôi;
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Và/hoặc các đối tác khác mà chúng tôi tiết lộ hoặc bên thứ ba đó
                thu thập và xử lý thông tin của bản vì một trong các Mục đích
                thu thập được đề cập theo Quy chế này.
              </p>
              Những cá nhân và/hoặc công ty này sẽ có thể truy cập thông tin này
              của bạn khi cần thực hiện các chức năng của họ, nhưng không được
              chia sẻ thông tin này cho bất kỳ bên thứ ba nào khác và cam kết
              tuân thủ các nghĩa vụ bảo mật tương đương như được Quy định tại
              Quy chế này. Chúng tôi có thể tiết lộ thông tin như vậy nếu có yêu
              cầu pháp lý, hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền
              hoặc chúng tôi tin rằng đó là hành động cần thiết để: (a) tuân
              theo theo quy định pháp luật; (b) ngăn chặn tội phạm hoặc bảo vệ
              an ninh quốc gia; hoặc (c) bảo vệ an toàn cá nhân của người sử
              dụng hoặc cộng đồng..
              <p>
                Chúng tôi có thể dùng tên bạn, tên hoặc logo của công ty bạn,
                hay thông tin khác về hoặc từ các hoạt động quảng cáo tuyển dụng
                hoặc tài khoản xem hồ sơ ứng viên của bạn cho bất kỳ hoặc tất cả
                các mục đích tiếp thị của chúng tôi. Ví dụ các tên và logo công
                ty có thể được sử dụng trong quảng cáo trên báo, phương tiện
                điện tử, thư gửi trực tiếp và/hoặc các tài liệu khác liên quan
                trên Nền tảng website vieclamtot.com hoặc của chúng tôi.
              </p>
            </div>
            <h3 className="content__sub-title">4. Cookies</h3>
            <p className="content__body">
              Chúng tôi có thể sử dụng “Cookies” hoặc các tính năng khác để cho
              phép chúng tôi hoặc bên thứ ba thu thập hoặc chia sẻ thông tin cá
              nhân của bạn sẽ giúp chúng tôi cải thiện Nền tảng của mình và Dịch
              vụ do chúng tôi cung cấp.
              <br />
              Chúng tôi có thể sử dụng cookie để bạn không phải nhập thông tin
              đăng nhập của mình cho mỗi lần vào Nền tảng.
              <br />
              Thông tin duy nhất mà cookie có thể chứa là thông tin mà chính
              người dùng cung cấp. Một tập cookie không thể đọc dữ liệu bên
              ngoài ổ cứng của người dùng hoặc đọc các tập cookie được tạo ra
              bởi các trang web khác.
              <br />
              Khi truy cập và sử dụng Nền tảng, bạn đồng ý cho chúng tôi sử dụng
              Cookie để lưu trữ thông tin trên thiết bị của bạn.
              <br />
              Bạn có thể quản lý và xóa cookies thông qua cài đặt trình duyệt
              hoặc thiết bị của bạn. Tuy nhiên, vui lòng lưu ý rằng nếu bạn thực
              hiện thao tác này bạn có thể không sử dụng được các chức năng đầy
              đủ của Nền tảng hoặc các Dịch vụ của chúng tôi.
            </p>
            <h3 className="content__sub-title">
              5. Truy cập, điều chỉnh thông tin cá nhân
            </h3>
            <div className="content__body">
              <p className="content__body-indent content__body-dotsymbol">
                Bạn có thể xem và thay đổi các thông tin cá nhân của mình tại
                trang Hồ sơ cá nhân.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Bạn có thể yêu cầu truy cập các thông tin khác chúng tôi thu
                thập từ bạn, bằng cách liên hệ với chúng tôi qua email được công
                bố ở dưới.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Bạn có thể yêu cầu chấm dứt việc sử dụng thông tin cá nhân bằng
                cách liên hệ với chúng tôi qua email được công bố ở dưới.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Bạn có thể xóa lịch sử hội thoại trong chức năng Chat trên Nền
                tảng.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Chúng tôi có thể từ chối bạn yêu cầu truy cập thông tin cá nhân
                nếu:
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Thông tin chỉ dùng với mục đích phân tích và đánh giá.
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Thông tin sử dụng cho mục đích giải quyết tranh chấp (ví dụ:
                thông tin cá nhân của người khác/đối tượng tranh chấp).
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Thông tin tổn hại đến hoạt động thương mại & cạnh tranh của
                chúng tôi.
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Chi phí, công sức cho việc cung cấp dữ liệu này không tương xứng
                với lợi ích nhận được của chúng tôi hoặc của bạn.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Chúng tôi có quyền xác định thông tin nào nằm trong phạm vi có
                thể từ chối.
              </p>
            </div>
            <h3 className="content__sub-title">
              6. Các phương thức bảo vệ thông tin cá nhân
            </h3>
            <div className="content__body">
              <p className="content__body-indent content__body-dotsymbol">
                Chúng tôi có các biện pháp kỹ thuật thích hợp để đảm bảo các
                thông tin thu thập được sẽ được lưu giữ an toàn, tránh truy cập
                trái phép thông tin người dùng như:
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Sử dụng sản phẩm công nghệ để ngăn chặn truy cập máy tính trái
                phép.
              </p>
              <p className="content__body-indent2x content__body-dotsymbol">
                Xóa thông tin cá nhân của quý khách khi nó không còn cần thiết
                cho mục đích lưu trữ hồ sơ của chúng tôi.
              </p>
              <p className="content__body-indent content__body-dotsymbol">
                Chúng tôi sử dụng công nghệ mã hóa theo giao thức 128-bit SSL
                (secure sockets layer) khi xử lý tài khoản của bạn.
              </p>
            </div>
          </section>
          <section id="terms-of-use">
            <h2 ref={titleThreeRef} className="content__title">
              Điều khoản sử dụng
            </h2>
            <p className="content__body">
              Chào mừng bạn đến với ứng dụng tìm việc làm HiJob, được vận hành
              bởi Công ty TNHH NeoWorks (sau đây có thể được gọi là “NeoWorks”
              hoặc “Chúng tôi”). HiJob cam kết tôn trọng và cam kết bảo vệ dữ
              liệu cá nhân của người dùng. Chúng tôi cam kết sẽ thực hiện các
              biện pháp liên quan để bảo vệ dữ liệu cá nhân của người dùng tuân
              theo các quy định pháp luật áp dụng về bảo mật thông tin/dữ liệu
              cá nhân. Chính sách bảo mật này hay còn gọi là Quy chế quyền riêng
              tư (sau đây được gọi chung là “Quy chế”) được lập nhằm quy định
              cách thức chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và/hoặc xử
              lý dữ liệu khi bạn truy cập vào trang web HiJob.com của chúng tôi
              và tất cả các trang web phụ liên quan khác (“Nền tảng”). Bằng việc
              sử dụng các Dịch vụ, đăng ký Tài khoản với chúng tôi hoặc truy cập
              Nền tảng của chúng tôi, bạn xác nhận và đồng ý cho phép chúng tôi
              thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn
              như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ
              LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI LÒNG KHÔNG
              SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN TẢNG CỦA CHÚNG
              TÔI.
              <br />
              Chúng tôi có toàn quyền sửa đổi, bổ sung, cập nhật Quy chế này tại
              từng thời điểm. Nếu Chúng tôi thay đổi Quy chế này, chúng tôi sẽ
              đăng những thay đổi đó hoặc Quy chế Quyền riêng tư được sửa đổi
              trên Nền tảng của chúng tôi.
              <br />
              Chào mừng bạn đến với ứng dụng tìm việc làm HiJob, được vận hành
              bởi Công ty TNHH NeoWorks (sau đây có thể được gọi là “NeoWorks”
              hoặc “Chúng tôi”). HiJob cam kết tôn trọng và cam kết bảo vệ dữ
              liệu cá nhân của người dùng. Chúng tôi cam kết sẽ thực hiện các
              biện pháp liên quan để bảo vệ dữ liệu cá nhân của người dùng tuân
              theo các quy định pháp luật áp dụng về bảo mật thông tin/dữ liệu
              cá nhân. Chính sách bảo mật này hay còn gọi là Quy chế quyền riêng
              tư (sau đây được gọi chung là “Quy chế”) được lập nhằm quy định
              cách thức chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và/hoặc xử
              lý dữ liệu khi bạn truy cập vào trang web HiJob.com của chúng tôi
              và tất cả các trang web phụ liên quan khác (“Nền tảng”). Bằng việc
              sử dụng các Dịch vụ, đăng ký Tài khoản với chúng tôi hoặc truy cập
              Nền tảng của chúng tôi, bạn xác nhận và đồng ý cho phép chúng tôi
              thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn
              như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ
              LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI LÒNG KHÔNG
              SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN TẢNG CỦA CHÚNG
              TÔI.
              <br />
              Chào mừng bạn đến với ứng dụng tìm việc làm HiJob, được vận hành
              bởi Công ty TNHH NeoWorks (sau đây có thể được gọi là “NeoWorks”
              hoặc “Chúng tôi”). HiJob cam kết tôn trọng và cam kết bảo vệ dữ
              liệu cá nhân của người dùng. Chúng tôi cam kết sẽ thực hiện các
              biện pháp liên quan để bảo vệ dữ liệu cá nhân của người dùng tuân
              theo các quy định pháp luật áp dụng về bảo mật thông tin/dữ liệu
              cá nhân. Chính sách bảo mật này hay còn gọi là Quy chế quyền riêng
              tư (sau đây được gọi chung là “Quy chế”) được lập nhằm quy định
              cách thức chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ và/hoặc xử
              lý dữ liệu khi bạn truy cập vào trang web HiJob.com của chúng tôi
              và tất cả các trang web phụ liên quan khác (“Nền tảng”). Bằng việc
              sử dụng các Dịch vụ, đăng ký Tài khoản với chúng tôi hoặc truy cập
              Nền tảng của chúng tôi, bạn xác nhận và đồng ý cho phép chúng tôi
              thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn
              như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ
              LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI LÒNG KHÔNG
              SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN TẢNG CỦA CHÚNG
              TÔI. dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn như quy
              định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ
              LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI LÒNG KHÔNG SỬ
              DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN TẢNG CỦA CHÚNG
              TÔI. Chào mừng bạn đến với ứng dụng tìm việc làm HiJob, được vận
              hành bởi Công ty TNHH NeoWorks (sau đây có thể được gọi là
              “NeoWorks” hoặc “Chúng tôi”). HiJob cam kết tôn trọng và cam kết
              bảo vệ dữ liệu cá nhân của người dùng. Chúng tôi cam kết sẽ thực
              hiện các biện pháp liên quan để bảo vệ dữ liệu cá nhân của người
              dùng tuân theo các quy định pháp luật áp dụng về bảo mật thông
              tin/dữ liệu cá nhân. Chính sách bảo mật này hay còn gọi là Quy chế
              quyền riêng tư (sau đây được gọi chung là “Quy chế”) được lập nhằm
              quy định cách thức chúng tôi thu thập, sử dụng, tiết lộ, lưu trữ
              và/hoặc xử lý dữ liệu khi bạn truy cập vào trang web HiJob.com của
              chúng tôi và tất cả các trang web phụ liên quan khác (“Nền tảng”).
              Bằng việc sử dụng các Dịch vụ, đăng ký Tài khoản với chúng tôi
              hoặc truy cập Nền tảng của chúng tôi, bạn xác nhận và đồng ý cho
              phép chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá
              nhân của bạn như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý
              CHO PHÉP XỬ LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI
              LÒNG KHÔNG SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN
              TẢNG CỦA CHÚNG TÔI. dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân
              của bạn như quy định trong Quy chế này. NẾU BẠN KHÔNG ĐỒNG Ý CHO
              PHÉP XỬ LÝ DỮ LIỆU CỦA BẠN NHƯ QUY ĐỊNH TRONG QUY CHẾ NÀY, VUI
              LÒNG KHÔNG SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HOẶC TRUY CẬP NỀN
              TẢNG CỦA CHÚNG TÔI.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;
