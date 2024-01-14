import { Box, Heading, Text } from '@chakra-ui/react';
import SimpleSidebar from '../../components/external/ChakraComponents/Navigation';
import LargeWithLogoLeft from '../../components/external/ChakraComponents/Footer';

export default function Signature() {
  return (
    <SimpleSidebar>
      <Box className="Header"></Box>
      <Box className="Content">
        <Box px={12} py={8}>
          <Heading fontSize={'7xl'}>Signature Page</Heading>
        </Box>
        <Box px={12} py={4}>
          <Text textAlign={'justify'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
            vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
            delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
            eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam
            liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
            mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
            lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
            hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam
            aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
            invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed
            takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </Text>
        </Box>
        {/* <Center> */}
        {/* <Image src="/hahn.png" width={500} height={500} alt="Picture of the author" /> */}
        {/* </Center> */}
      </Box>
      <Box className="footer" borderTop={'1px solid lightgray'}>
        <LargeWithLogoLeft />
      </Box>
    </SimpleSidebar>
  );
}
